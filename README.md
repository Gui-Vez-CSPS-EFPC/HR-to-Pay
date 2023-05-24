# HR-to-Pay
This repo is for the HR-to-Pay course on the Brightspace platform.

## Setup
To setup this project and use it: 

 1. Make sure you have [Node.js](https://nodejs.org/en/download/) installed on your computer.
 2. Clone the repo on your computer.
 3. Open a terminal in the project's directory.
 4. Run `npm install` to install dependencies.

## Starting the DEV Server
To start the local DEV server, run `npm run dev` in a terminal in the project's directory. The terminal will show you where the server is running. It should be on `localhost:5173`. Open that URL in your browser to see what your are working on live (every time you save a file, this file is reloaded, so no need to refresh page every time!).

## Creating Pages
When starting the DEV server, you will end up on the "home" page. There isn't much interesting in there. To see the two page examples that come with the project, click on either link on the "home" page (both are pretty much the same).

To create your first page, you can start from one of the two example page. Recommended is to start from Page 2 and keep Page 1 as an example while doing so. This is what we will show below.

To edit Page 2, open the `page2.vue` file in the /src/page2/ folder. What is contained in the `<template>` element is what will show up on the page.

### Adding New Pages
Once you have done your first page using the Page 2, if you want to create other pages, you will need to create other pages. To create a new page, here are the steps:

 1. Duplicate the whole page1 folder under the src folder and rename it to what you like. For this example we will use page3.
 2. In this new folder, rename the `page1.js` and `page1.vue` files to the same name as the folder.
 3. Open the page3.js file and replace the lines that say `import page1 from './page1.vue'`  and `createApp(page1).mount('#app')` to change the 3 places where you see page1 to the same thing as before (page3 in our case).
 4. Open the index.html file in the new folder and edit the line that says `<script type="module" src="page1.js"></script>` to once again replace where you see page1 to the same thing as before (page3 in our case).
 5. To better test (optional), in the `page3.vue` file, change the `<h1>`'s content to something different (in our case we will put Page 3).
 6. Open the `vite.config.js` file in the root of the project and in the `build.rollupOptions.input` element, add a new line by copying the one for page1 and once again replace both places where you see page1 to the same thing as before (page3 in our case). Don't touch the first one (main), this is for the home page.

Now, if you go in your browser and navigate to `localhost:XXXX/page3/`, you should see your new page. You can now edit the `page3.vue` file to create your new page like explained before.

### Renaming a Page
To rename a page, simply follow the same steps without copying an existing one (only change folder/file/variable names in all the same places).

### Translations
To create a French page, you can go in the `index.html` file that corresponds to that page and simply change the `lang="en"` attribute on the `<html>` tag to "fr" and every buit-in text will be automatically changed to French.

## Building for Brightspace

To add your pages on Brightspace:

 1. Open a terminal in the project's directory and run the `npm run build` command.
 2. The command will create a dist folder in the project's root. Zip this folder and upload it in the course files for your course on Brightspace and then unzip it in Brightspace. You can then rename the folder in Brightspace to something more appropriate.
 3. You will see that the folder contains an `index.html` file. This is the "home page" from before. The more important stuff is in the page1, page2 and page3 folders (or whatever the name of your pages). Each also contains an `index.html` file. You can add these HTML files to the course content by clicking the arrow next to them and clicking "Add Content Topic".

Voilà!