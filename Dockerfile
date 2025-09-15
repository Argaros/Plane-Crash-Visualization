FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["Plane Crash Visualization.csproj", "./"]
RUN dotnet restore "./Plane Crash Visualization.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Plane Crash Visualization.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Plane Crash Visualization.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Plane Crash Visualization.dll"]
