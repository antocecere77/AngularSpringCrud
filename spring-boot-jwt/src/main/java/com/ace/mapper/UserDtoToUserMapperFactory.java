package com.ace.mapper;

import com.ace.entity.User;
import com.ace.model.UserDto;
import ma.glasnost.orika.MapperFacade;
import ma.glasnost.orika.MapperFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class UserDtoToUserMapperFactory {

    @Autowired
    private MapperFactory mapperFactory;

    @Bean
    public MapperFacade UserDtoToUserMapper() {
        mapperFactory.classMap(UserDto.class, User.class)
                .byDefault()
                .register();
        return mapperFactory.getMapperFacade();
    }

}
