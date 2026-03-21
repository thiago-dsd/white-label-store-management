@echo off
setlocal

set "MAVEN_HOME=%~dp0.mvn\maven\apache-maven-3.9.6"

if not exist "%MAVEN_HOME%\bin\mvn.cmd" (
    echo Downloading Maven 3.9.6...
    mkdir "%~dp0.mvn\maven" 2>nul
    curl -sL https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip -o "%~dp0.mvn\maven\maven.zip"
    powershell -Command "Expand-Archive -Force '%~dp0.mvn\maven\maven.zip' '%~dp0.mvn\maven'"
    del "%~dp0.mvn\maven\maven.zip"
)

"%MAVEN_HOME%\bin\mvn.cmd" %*
