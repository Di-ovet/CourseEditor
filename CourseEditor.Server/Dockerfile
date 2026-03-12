# -----------------------------
# Этап 1: Build ASP.NET Server + React
# -----------------------------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Установка Node.js (для сборки React)
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Копируем csproj для зависимостей
COPY ["CourseEditor.Server/CourseEditor.Server.csproj", "CourseEditor.Server/"]
COPY ["CourseEditor.Domain/CourseEditor.Domain.csproj", "CourseEditor.Domain/"]
COPY ["CourseEditor.Application/CourseEditor.Application.csproj", "CourseEditor.Application/"]
COPY ["CourseEditor.Infrastructure/CourseEditor.Infrastructure.csproj", "CourseEditor.Infrastructure/"]

RUN dotnet restore "CourseEditor.Server/CourseEditor.Server.csproj"


# Копируем весь исходный код
COPY . .

# -----------------------------
# Сборка React клиента
# -----------------------------
WORKDIR /src/courseeditor.client
RUN npm config fix
RUN npm install
RUN npm run build

# -----------------------------
# Сборка и публикация сервера
# -----------------------------
WORKDIR /src/CourseEditor.Server
RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

# ----------------------------- 
# Этап 2: Финальный контейнер
# -----------------------------
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

# Копируем опубликованный сервер
COPY --from=build /app/publish .

# Копируем React dist в wwwroot
COPY --from=build /src/courseeditor.client/dist ./wwwroot

EXPOSE 5010
ENV ASPNETCORE_URLS=http://+:5010
ENTRYPOINT ["dotnet", "CourseEditor.Server.dll"]