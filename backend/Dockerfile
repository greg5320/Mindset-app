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
    echo 'fn main() { println!("Placeholder"); }' > src/main.rs && \
    cargo build --release && \
    rm -rf src

# Копируем настоящий исходный код
COPY . .

# Проверяем содержимое директории
RUN ls -la src/

# Собираем приложение
RUN cargo build --release

# Проверяем, что исполняемый файл создан
RUN ls -la target/release/

# Используем минимальный образ для запуска
FROM debian:bookworm-slim

# Устанавливаем необходимые зависимости для запуска
RUN apt-get update && apt-get install -y \
    libssl-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Копируем исполняемый файл из предыдущего этапа
# Обратите внимание: имя файла должно соответствовать имени в Cargo.toml
COPY --from=builder /app/target/release/rust_mindset_backend /usr/local/bin/

# Проверяем, что файл существует
RUN ls -la /usr/local/bin/rust_mindset_backend

# Создаем пользователя для запуска приложения
RUN useradd -m appuser
USER appuser

# Открываем порт 8000
EXPOSE 8000

# Запускаем приложение
CMD ["rust_mindset_backend"]