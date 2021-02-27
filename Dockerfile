FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS build
WORKDIR /src
COPY ["Asker.csproj", ""]
RUN dotnet restore "./Asker.csproj"
COPY . .
WORKDIR "/src/."
RUN apt update && apt install nodejs -y && apt install npm -y
RUN dotnet build "Asker.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Asker.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# ENTRYPOINT [ "dotnet", "Asker.dll" ]
CMD ASPNETCORE_URLS=http://*:$PORT dotnet Asker.dll