# Flutter构建错误：could not get resource

> A problem occurred configuring root project 'android'.
>
> Could not resolve all artifacts for configuration ':classpath'.
> Could not resolve com.android.tools.build:gradle:3.5.0.
> Required by:
>     project :
>     > Could not resolve com.android.tools.build:gradle:3.5.0.
>        > Could not get resource 'https://maven.aliyun.com/repository/google/com/android/tools/build/gradle/3.5.0/gradle-3.5.0.pom'.
>           > Could not GET 'https://maven.aliyun.com/repository/google/com/android/tools/build/gradle/3.5.0/gradle-3.5.0.pom'.
>              > sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target

## 解决方法

提高gradle的版本以及将包的库换为易于国内访问的镜像站

1. 在项目目录下，打开android/gradle.properties，添加

   ```gradle.properties
   distributionUrl=https://services.gradle.org/distributions/gradle-5.1.1-all.zip
   ```

2. 在项目目录下，打开android/build.gradle，修改buildscript、allprojects

   ```gradle
   buildscript {
       ext.kotlin_version = '1.3.50'
       repositories {
   -       google()
   -       jcenter()
   +       maven { url 'https://maven.aliyun.com/repository/google' }
   +       maven { url 'https://maven.aliyun.com/repository/jcenter' }
   +       maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
       }
   
       dependencies {
           // 更新为Android Studio提示的最新版
   -       classpath 'com.android.tools.build:gradle:3.5.0'
   +       classpath 'com.android.tools.build:gradle:3.5.3'
           classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
       }
   }
   ```

   ```gradle
   allprojects {
       repositories {
   -         google()
   -         jcenter()
   +       maven { url 'https://maven.aliyun.com/repository/google' }
   +       maven { url 'https://maven.aliyun.com/repository/jcenter' }
   +       maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
       }
   }
   ```

3. 在flutter目录下，打开packages/flutter_tools/gradle/flutter.gradle，修改buildscript

   ```gradle
   buildscript {
       repositories {
   -       google()
   -       jcenter()
   +       maven { url 'https://maven.aliyun.com/repository/google' }
   +       maven { url 'https://maven.aliyun.com/repository/jcenter' }
   +       maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
       }
       dependencies {
       	// 更新为Android Studio提示的最新版
   -       classpath 'com.android.tools.build:gradle:3.5.0'
   +       classpath 'com.android.tools.build:gradle:3.5.3'
       }
   }
   ```

   

