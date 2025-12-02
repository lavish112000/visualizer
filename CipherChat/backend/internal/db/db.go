package db

import (
	"context"
	"fmt"
	"log"

	"github.com/cipherchat/backend/internal/config"
	"github.com/gocql/gocql"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/redis/go-redis/v9"
)

type Store struct {
	Postgres *pgxpool.Pool
	Scylla   *gocql.Session
	Redis    *redis.Client
	Minio    *minio.Client
}

func NewStore(cfg *config.Config) (*Store, error) {
	// Postgres
	pgPool, err := pgxpool.New(context.Background(), cfg.PostgresURL)
	if err != nil {
		return nil, fmt.Errorf("unable to connect to postgres: %w", err)
	}

	// Scylla
	cluster := gocql.NewCluster(cfg.ScyllaHosts...)
	cluster.Keyspace = "messenger"
	cluster.Consistency = gocql.Quorum
	scyllaSession, err := cluster.CreateSession()
	if err != nil {
		pgPool.Close()
		return nil, fmt.Errorf("unable to connect to scylla: %w", err)
	}

	// Redis
	rdb := redis.NewClient(&redis.Options{
		Addr: cfg.RedisAddr,
	})
	if _, err := rdb.Ping(context.Background()).Result(); err != nil {
		pgPool.Close()
		scyllaSession.Close()
		return nil, fmt.Errorf("unable to connect to redis: %w", err)
	}

	// MinIO
	minioClient, err := minio.New(cfg.MinIOEndpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(cfg.MinIOAccessKey, cfg.MinIOSecretKey, ""),
		Secure: cfg.MinIOUseSSL,
	})
	if err != nil {
		pgPool.Close()
		scyllaSession.Close()
		rdb.Close()
		return nil, fmt.Errorf("unable to connect to minio: %w", err)
	}

	log.Println("Connected to all databases")

	return &Store{
		Postgres: pgPool,
		Scylla:   scyllaSession,
		Redis:    rdb,
		Minio:    minioClient,
	}, nil
}

func (s *Store) Close() {
	if s.Postgres != nil {
		s.Postgres.Close()
	}
	if s.Scylla != nil {
		s.Scylla.Close()
	}
	if s.Redis != nil {
		s.Redis.Close()
	}
}
