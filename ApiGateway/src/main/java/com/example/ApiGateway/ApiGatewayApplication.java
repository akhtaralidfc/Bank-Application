package com.example.ApiGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayApplication.class, args);
	}
//	@Bean
//	public CorsWebFilter corsWebFilter() {
//		System.out.println("inside api gateway");
//		CorsConfiguration corsConfig = new CorsConfiguration();
//		corsConfig.setAllowCredentials(true); // Allow credentials (e.g., cookies, authorization headers)
//		corsConfig.setAllowedOrigins(Collections.singletonList("http://localhost:3000/")); // Your React frontend URL
//		corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")); // Allowed HTTP methods
//		corsConfig.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "x-requested-with")); // Important: include custom headers
//		corsConfig.setMaxAge(3600L); // How long the preflight response can be cached (in seconds)
//
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		// Apply this CORS configuration to all paths (your gateway handles multiple services)
//		// If you only want to apply it to specific routes, you can define more specific paths here.
//		// For a Gateway, "/**" is usually appropriate.
//		source.registerCorsConfiguration("/**", corsConfig);
//		return new CorsWebFilter(source);
//	}

}
