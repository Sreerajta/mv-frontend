export function configureFakeBackend() {
    let users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];
    let movies = [
    {title:"Midsommar",rating:"7.1",plot:"A couple travels to Sweden to visit a rural hometown's fabled mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.",poster:"https://m.media-amazon.com/images/M/MV5BMzQxNzQzOTQwM15BMl5BanBnXkFtZTgwMDQ2NTcwODM@._V1_SX300.jpg"},
    {title:"Inception",rating:"OVERRATED",plot:"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",poster:"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"},
    {title:"Hereditary",rating:"7.3",plot:"A grieving family is haunted by tragic and disturbing occurrences.",poster:"https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_SX300.jpg"},
    {title:"Rick and Morty",rating:"9.2",plot:"An animated series that follows the exploits of a super scientist and his not-so-bright grandson.",poster:"https://m.media-amazon.com/images/M/MV5BMjRiNDRhNGUtMzRkZi00MThlLTg0ZDMtNjc5YzFjYmFjMmM4XkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg"},
    {title:"Stories by Rabindranath Tagore",rating:"9.0",plot:"Adaptation of Nobel laureate Rabindranath Tagore's stories by acclaimed Indian director Anurag Basu",poster:"https://m.media-amazon.com/images/M/MV5BZWU3OTgzNmItOGI0Mi00ZWZmLTgyZDctNzQxZWVhNzk5YjQ1XkEyXkFqcGdeQXVyNTM2MTEyNDc@._V1_SX300.jpg"},
    {title:"The Simpsons",rating:"8.7",plot:"The satiric adventures of a working-class family in the misfit city of Springfield.",poster:"https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"},
    {title:"Panchayat",rating:"9.1",plot:"Panchayat is a comedy-drama, which captures the journey of an engineering graduate Abhishek, who for lack of a better job option joins as secretary of a Panchayat office in a remote village of Uttar Pradesh.",poster:"https://m.media-amazon.com/images/M/MV5BMTllYzQ0MzctZTI4Ny00YTE2LTkzYjktMTc4ZWE2MDUxNzk2XkEyXkFqcGdeQXVyNzEyNTM4MTU@._V1_SX300.jpg"}];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        
        const isLoggedIn = opts.headers['Authorization'] === 'Bearer fake-jwt-token';

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/login') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const user = users.find(x => x.username === params.username && x.password === params.password);
                    if (!user) return error('Username or password is incorrect');
                    return ok({
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    });
                }

                if (url.endsWith('/getMovies') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(movies);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
                }

                function unauthorised() {
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
                }

                function error(message) {
                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                }
            }, 500);
        });
    }
}