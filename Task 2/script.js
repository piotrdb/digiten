// Dynamic json file import with type assertion and error catch

const json = await import("./data.json", {

    assert: { type: "json" },
  
  }).catch(() => {
  
    // Display error message after unsuccessful json import
  
    const errorMessage = document.getElementById("error-message");
  
    errorMessage.style.display = "block";
  
    errorMessage.textContent = "JSON file is invalid or not found";
  
    // Assign empty object to const json in case of error
  
    return {};
  
  });
  
   
  
  // Function to display posts
  
  function displayPosts(posts) {
  
    // For inserting blog cards
  
    const blogPostsContainer = document.getElementById("blog-posts");
  
    // For setting error message after too strict filters
  
    const errorMessage = document.getElementById("error-message");
  
    // Empty blog posts container to prevent multiple display
  
    blogPostsContainer.innerHTML = "";
  
    // Hide error message unless no filter-matching posts are found.
  
    errorMessage.style.display = "none";
  
    if (posts.length === 0) {
  
      errorMessage.textContent = "No matching posts found.";
  
      errorMessage.style.display = "block";
  
    } else {
  
      // If there are posts to show then create post card for each
  
      posts.forEach((post) => {
  
        const postCard = document.createElement("div");
  
        postCard.classList.add("post-card");
  
   
  
        const title = document.createElement("h2");
  
        title.textContent = post.title;
  
        postCard.appendChild(title);
  
   
  
        const date = document.createElement("p");
  
        date.textContent = `Date: ${post.date}`;
  
        postCard.appendChild(date);
  
   
  
        const content = document.createElement("p");
  
        content.textContent = post.content;
  
        postCard.appendChild(content);
  
   
  
        blogPostsContainer.appendChild(postCard);
  
      });
  
    }
  
  }
  
   
  
  // Function to fill the category dropdown
  
  function fillCategories(posts) {
  
    const categoryDropdown = document.getElementById("category-dropdown");
  
    // Create categories array by extracting unique category values from posts
  
    const categories = [...new Set(posts.map((post) => post.category))];
  
    // Add "All Categories" option which will be default filter
  
    categories.unshift("All Categories");
  
    // For each category create category option for dropdown
  
    categories.forEach((category) => {
  
      const categoryOption = document.createElement("div");
  
      categoryOption.textContent = category;
  
      // For every single div with category add listener to click
  
      categoryOption.addEventListener("click", () => {
  
        // After clicking on category filter using it
  
        filterByCategory(category);
  
      });
  
      categoryDropdown.appendChild(categoryOption);
  
    });
  
  }
  
   
  
  // Function to filter blog posts by category, called after clicking on category dropdown item
  
  function filterByCategory(category) {
  
    // Change global variable category filter to category from argument
  
    categoryFilter = category;
  
    const categoryDropdownButton = document.getElementById(
  
      "category-dropdown-button"
  
    );
  
    // Change dropdown label to current category
  
    categoryDropdownButton.textContent = categoryFilter;
  
    // Call function to apply current filters
  
    applyFilters();
  
  }
  
   
  
  // Function to apply filters and sort
  
  function applyFilters() {
  
    // Create shallow copy of all post from json file
  
    let filteredPosts = [...data];
  
   
  
    if (categoryFilter !== "All Categories") {
  
      // If there is category filter then filter posts based on it
  
      filteredPosts = filteredPosts.filter(
  
        (post) => post.category === categoryFilter
  
      );
  
    }
  
    // Filter posts based on date range
  
    filteredPosts = filteredPosts.filter((post) => {
  
      const postDate = new Date(post.date);
  
      return postDate >= startDate && postDate <= endDate;
  
    });
  
   
  
    // Display filtered posts
  
    displayPosts(filteredPosts);
  
  }
  
   
  
  // Function to sort blog posts by date
  
  function sortPosts() {
  
    // Sort all posts by date
  
    const sortedPosts = [...data].sort((a, b) => {
  
      const dateA = new Date(a.date);
  
      const dateB = new Date(b.date);
  
      if (ascending) {
  
        return dateA - dateB;
  
      } else {
  
        return dateB - dateA;
  
      }
  
    });
  
   
  
    // Change button label depending on actual order
  
    const sortButton = document.getElementById("sort-button");
  
    if (ascending) {
  
      sortButton.textContent = "Ascending";
  
    } else {
  
      sortButton.textContent = "Descending";
  
    }
  
    // Order switch
  
    ascending = !ascending;
  
   
  
    // Change global posts data to sorted posts
  
    data = sortedPosts;
  
  }
  
   
  
  // Event listener for category dropdown button
  
  document
  
    .getElementById("category-dropdown-button")
  
    .addEventListener("click", () => {
  
      // Show and hide after click
  
      document.getElementById("category-dropdown").classList.toggle("hide");
  
    });
  
   
  
  // Event listener for start date
  
  document.getElementById("start-date").addEventListener("change", (e) => {
  
    // Change date on input change
  
    startDate = new Date(e.target.value);
  
    applyFilters();
  
  });
  
   
  
  // Event listener for end date
  
  document.getElementById("end-date").addEventListener("change", (e) => {
  
    // Change date on input change
  
    endDate = new Date(e.target.value);
  
    applyFilters();
  
  });
  
   
  
  // Event listener for sorting button
  
  document.getElementById("sort-button").addEventListener("click", () => {
  
    // Sort post after click
  
    sortPosts();
  
    // Aply Filters after sort
  
    applyFilters();
  
  });
  
   
  
  // Initialize variables
  
   
  
  let data = json.default;
  
  let ascending = false;
  
  let startDate = new Date("2000-01-01");
  
  let endDate = new Date();
  
  let categoryFilter = "All Categories";
  
  document.getElementById("category-dropdown-button").textContent =
  
    categoryFilter;
  
   
  
  // Initialize website with all blog posts
  
  fillCategories(data);
  
  sortPosts();
  
  applyFilters();