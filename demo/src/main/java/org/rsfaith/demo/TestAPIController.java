package org.rsfaith.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestAPIController {
	@GetMapping("/testapi")
	public String retrieveCoursesForStudent() {
		System.out.println("API hit!!");
		return "API has been hit";
	}
}
