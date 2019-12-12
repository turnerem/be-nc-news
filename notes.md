# Notes on BE Block Review

Primary keys: are they not by necessity unique? Or must we also specify uniqueness?
Having trouble using .modify and .leftJoin in same query.
- it may not be possible to update and select/join in SQL. So knex won't work if we pile these statements into one query

## Left off at:
get request to articles/:articles\_id. Unsatisfactory error handling. First thing: Make nice chart of error types and associated codes and messages x
After Lunch: GET request for all comments associated with an article
- check fetchArticle and patchArticle are still working.
- how to check whether author exists?
- in fetchArticles: Need to unest checks for existence of topic and author

## Q&A Lecture
use .modify to account for undefined input variables instead of Promise.rejects
- .catch(next) is shorthand for .catch(err => next(err))

## README:
- provde knexfile, plus note for linux users to include password/username

## Hosting:
- so that everyone can access my website, I must use Heroku.
  - Push up to github, push app to Heroku, and Heroku will 'npm start' for us
  - Herooku also offers db hosting services
  - Herokue sets process.env.NODE\_ENV to equal 'production'. And will also set process.env.PORT, .DB\_URL too
  - It hosts the back end
- Another site will host my frontend, and it will make requests to Heroku to get info
- there is an option for gitHub to automatically update Heroku for us.
