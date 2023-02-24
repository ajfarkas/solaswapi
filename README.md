# solaswapi
A Web-app for finding Star Wars info

This was made fairly quickly, so I opted to use my time coding and styling rather than filling out boilerplate (webpack, typescript, react, SCSS, etc.).

I'm working within the context of the SWAPI schema, which is not perfect for this project, though APIs seldom are. In particular, we get a lot more data than we need for each call, and it is redundant between the main page and the individual character pages.

In production, I would want to cache the rendered pages on the server so that 1. we can serve the full page to the client, reducing load times and payload size, and 2. to optimize for SEO (this is not a great setup for search).

These pages will work on mobile and desktop. There are efficiencies and features to implement, top among them some accessibility fixes such as the option to disable the Star-Wars-text crawl. The page should work well with screen readers.
