package com.ace.service.impl;

import com.ace.repository.UserRepository;
import com.ace.entity.User;
import com.ace.model.UserDto;
import com.ace.service.UserService;
import ma.glasnost.orika.MapperFacade;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder bcryptEncoder;

	@Autowired
	private MapperFacade userDtoToUserMapper;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if(user == null){
			throw new UsernameNotFoundException("Invalid username or password.");
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority());
	}

	private List<SimpleGrantedAuthority> getAuthority() {
		return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
	}

	public List<User> findAll() {
		List<User> list = new ArrayList<>();
		userRepository.findAll().iterator().forEachRemaining(list::add);
		return list;
	}

	@Override
	public void delete(int id) {
		userRepository.deleteById(id);
	}

	@Override
	public User findOne(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User findById(int id) {
		Optional<User> optionalUser = userRepository.findById(id);
		return optionalUser.isPresent() ? optionalUser.get() : null;
	}

    @Override
    public UserDto update(UserDto userDto) {
        User user = findById(userDto.getId());
        String password = user.getPassword();
        if(user != null) {
			user = userDtoToUserMapper.map(userDto, User.class);
			user.setPassword(password);
            userRepository.save(user);
        }
        return userDto;
    }

    @Override
    public User save(UserDto user) {
	    User newUser = new User();
	    newUser.setUsername(user.getUsername());
	    newUser.setFirstName(user.getFirstName());
	    newUser.setLastName(user.getLastName());
	    newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setAge(user.getAge());
		newUser.setSalary(user.getSalary());
        return userRepository.save(newUser);
    }
}
