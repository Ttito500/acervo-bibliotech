FROM maven:3.9-amazoncorretto-21 AS build

# Diretório de trabalho no container
WORKDIR /app

# Copiar o arquivo pom.xml e o diretório src para o container
COPY pom.xml .
COPY src ./src

# Executar o comando de build do Maven
RUN mvn clean package -DskipTests

# Renomear o arquivo .jar gerado para 'app.jar'
RUN mv target/*.jar target/app.jar

# Expôr a porta em que o Spring Boot estará rodando
EXPOSE 8090

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "target/app.jar"]