FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["Asker.csproj", ""]
RUN dotnet restore "./Asker.csproj"
COPY . .
WORKDIR "/src/."
RUN apt-get update && apt-get install -y curl && curl -fsSL https://deb.nodesource.com/setup_15.x | bash - && apt-get install -y nodejs
RUN dotnet build "Asker.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Asker.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# ENTRYPOINT [ "dotnet", "Asker.dll" ]
CMD ASPNETCORE_URLS=http://*:$PORT dotnet Asker.dll