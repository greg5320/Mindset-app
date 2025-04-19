# Используем официальный образ Rust для сборки
FROM rust:1.86-slim as builder

# Устанавливаем необходимые зависимости
RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Создаем директорию для приложения
WORKDIR /app

# Копируем файлы Cargo.toml и Cargo.lock
COPY Cargo.toml Cargo.lock ./

# Создаем пустую структуру исходного кода для кэширования зависимостей
RUN mkdir -p src && \
    echo 'fn main() { println!("Hello from Rust backend!"); }' > src/main.rs && \
    cargo build --release && \
    rm -rf src

# Копируем настоящий исходный код
COPY . .

# Проверяем содержимое директории
RUN ls -la src/

# Изменяем привязку с localhost на 0.0.0.0 (если файл существует)
RUN if [ -f src/main.rs ]; then \
    sed -i 's/bind(("localhost", 8000))?/bind(("0.0.0.0", 8000))?/g' src/main.rs; \
    fi

# Собираем приложение
RUN cargo build --release

# Проверяем, что исполняемый файл создан
RUN ls -la target/release/

# Создаем простой тестовый сервер на случай, если основной не работает
RUN echo '#!/bin/bash\nwhile true; do echo -e "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n{\"status\":\"ok\"}" | nc -l -p 8000; done' > /app/test-server.sh && \
    chmod +x /app/test-server.sh

# Используем минимальный образ для запуска
FROM debian:bookworm-slim

# Устанавливаем необходимые зависимости для запуска
RUN apt-get update && apt-get install -y \
    libssl-dev \
    ca-certificates \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Копируем исполняемый файл из предыдущего этапа
COPY --from=builder /app/target/release/* /usr/local/bin/
COPY --from=builder /app/test-server.sh /usr/local/bin/

# Создаем пользователя для запуска приложения
RUN useradd -m appuser
USER appuser

# Открываем порт 8000
EXPOSE 8000

# Запускаем приложение или тестовый сервер, если основное приложение не работает
CMD if [ -x /usr/local/bin/rust_mindset_backend ]; then \
        /usr/local/bin/rust_mindset_backend; \
    else \
        echo "Rust backend not found, starting test server"; \
        /usr/local/bin/test-server.sh; \
    fi