# LinkedIn server service

service that manages LinkedIn public profiles, stores them in a structured manner in a persistent
layer and allows to perform queries.

## Getting Started
    These are examples of service Api:
    api/v1/Users:
        (get): - return all linkedin profile
        (get)/:id - return specific user that his uuid is exactly the same
        (get)?name= - return all users with name that is prefix is like inserted
        (get)?name='' & title='' - return all users with prefix name and title like inserted
        (post)/add
            body params: {name: string - required,
                          title: string - default: '',
                          company: string - default: '',
                          skills: []string - default: []
                           }
        (put)/update?uuid=
            body params: {name, title, company, skills}

### Installing

First, clone the github library: 
    
    git clone https://github.com/segalzeyalz/linkedin.git
    then install libraries and dependencies using yarn:
        yarn
    and them just run it!
        yarn start
    

## Running the tests
    for test just use:
        yarn test

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
