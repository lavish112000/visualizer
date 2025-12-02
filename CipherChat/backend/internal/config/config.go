package config

import (
	"os"
	"strconv"
)

type Config struct {
	ServerPort      string
	PostgresURL     string
	ScyllaHosts     []string
	RedisAddr       string
	MinIOEndpoint   string
	MinIOAccessKey  string
	MinIOSecretKey  string
	MinIOUseSSL     bool
}

func Load() *Config {
	return &Config{
		ServerPort:      getEnv("SERVER_PORT", "8080"),
		PostgresURL:     getEnv("POSTGRES_URL", "postgres://postgres:password@localhost:5432/cipherchat?sslmode=disable"),
		ScyllaHosts:     []string{getEnv("SCYLLA_HOST", "localhost")},
		RedisAddr:       getEnv("REDIS_ADDR", "localhost:6379"),
		MinIOEndpoint:   getEnv("MINIO_ENDPOINT", "localhost:9000"),
		MinIOAccessKey:  getEnv("MINIO_ACCESS_KEY", "minioadmin"),
		MinIOSecretKey:  getEnv("MINIO_SECRET_KEY", "minioadmin"),
		MinIOUseSSL:     getEnvAsBool("MINIO_USE_SSL", false),
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func getEnvAsBool(key string, fallback bool) bool {
	valStr := getEnv(key, "")
	if val, err := strconv.ParseBool(valStr); err == nil {
		return val
	}
	return fallback
}
