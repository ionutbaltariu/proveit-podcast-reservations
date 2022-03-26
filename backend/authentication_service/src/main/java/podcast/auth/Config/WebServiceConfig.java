package podcast.auth.Config;


import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.ws.config.annotation.EnableWs;
import org.springframework.ws.config.annotation.WsConfigurerAdapter;
import org.springframework.ws.transport.http.MessageDispatcherServlet;
import org.springframework.ws.wsdl.wsdl11.DefaultWsdl11Definition;
import org.springframework.xml.xsd.SimpleXsdSchema;
import org.springframework.xml.xsd.XsdSchema;

@EnableWs
@Configuration
public class WebServiceConfig extends WsConfigurerAdapter {
    @SuppressWarnings({"unchecked", "rawtypes"})
    @Bean
    public ServletRegistrationBean messageDispatcherServlet(ApplicationContext applicationContext){
        MessageDispatcherServlet result = new MessageDispatcherServlet();

        result.setApplicationContext(applicationContext);
        result.setTransformWsdlLocations(true);

        return new ServletRegistrationBean(result, "/ws/*");
    }

    @Bean(name="login")
    public DefaultWsdl11Definition defaultWsdl11Definition(XsdSchema loginSchema){
        DefaultWsdl11Definition result = new DefaultWsdl11Definition();

        result.setPortTypeName("LoginPort");
        result.setLocationUri("/");
        result.setTargetNamespace("http://podcast.auth/login");
        result.setSchema(loginSchema);
        return result;
    }

    @Bean
    public XsdSchema loginSchema(){
        return new SimpleXsdSchema(new ClassPathResource("login.xsd"));
    }

    @Bean(name="register")
    public DefaultWsdl11Definition registerDefaultWsdl11Definition(XsdSchema registerSchema){
        DefaultWsdl11Definition result = new DefaultWsdl11Definition();

        result.setPortTypeName("RegisterPort");
        result.setLocationUri("/");
        result.setTargetNamespace("http://podcast.auth/register");
        result.setSchema(registerSchema);
        return result;
    }

    @Bean
    public XsdSchema registerSchema(){
        return new SimpleXsdSchema(new ClassPathResource("register.xsd"));
    }

    @Bean(name="validate")
    public DefaultWsdl11Definition validateDefaultWsdl11Definition(XsdSchema validateSchema){
        DefaultWsdl11Definition result = new DefaultWsdl11Definition();

        result.setPortTypeName("ValidatePort");
        result.setLocationUri("/");
        result.setTargetNamespace("http://podcast.auth/validate");
        result.setSchema(validateSchema);
        return result;
    }

    @Bean
    public XsdSchema validateSchema(){
        return new SimpleXsdSchema(new ClassPathResource("validate.xsd"));
    }
}
