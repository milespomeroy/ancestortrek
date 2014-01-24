package com.ancestortrek;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class OauthController {

    @RequestMapping("/oauth")
    public void redirect(
            @RequestParam(value = "code", required = false) String code,
            HttpServletResponse response
    ) throws IOException {
        System.out.println(code);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "authorization_code");
        map.add("client_id", "WCQY-7J1Q-GKVV-7DNM-SQ5M-9Q5H-JX3H-CMJK");
        map.add("code", code);

        RestTemplate restTemplate = new RestTemplate();
        TokenResponse auth = restTemplate.postForObject(
                "https://sandbox.familysearch.org/cis-web/oauth2/v3/token",
                map,
                TokenResponse.class);

        System.out.println(auth);

        Cookie tokenCookie = new Cookie("fs_token", auth.getAccessToken());
        tokenCookie.setMaxAge(86400); // 24 hours

        response.addCookie(tokenCookie); // TODO: setSecure
        response.sendRedirect("/");
    }

}
