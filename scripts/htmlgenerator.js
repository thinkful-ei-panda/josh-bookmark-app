import store from './store.js';

function generateHomeScreen(filteredBookmarks) {
  let listItemsString = (filteredBookmarks) ? generateBookmarksString(filteredBookmarks) : generateBookmarksString(store.bookmarks);
  $('main').html(`
  <section class="container">
  <h1>Bookmarks</h1>
  <section class="flex-group-column">
  <form id="add-filter">
      <ul class="flex-item-buttons-top">
    <label for="stars" class="hidden">Filter</label>
      <select name="star-filter" id="stars" class="home-stars">
      <option class="home-stars" value="-1">Filter </option>
      <option class="home-stars" value="1">1+ Star</option>
      <option class="home-stars" value="2">2+ Stars</option>
      <option class="home-stars" value="3">3+ Stars</option>
      <option class="home-stars" value="4">4+ Stars</option>
      <option class="home-stars" value="5">5 Stars</option>
    </select>
    <button class="button-primary" id="add-btn">Add Bookmark</button>
  </form>
      </ul>
      </form>
      <section>
      <ul class="bookmarks-container">
      ${listItemsString}
      </ul>
      </section>
      </section>
      </section>`);
  handleStarFilterButton();
};

function generateBookmark(item){
  let starIconArr = [];
  for(let i = 0; i < item.rating; i++){
    starIconArr.push('<img src="img/star.svg" alt="rating">');
  }
  
  if(item.expanded === false){
    return `
    <section class="raised-card">
      <section class="flex-item-list">
        <section class="flex-group-column">
          <section>${item.title}</section>
          <section class="bookmark-stars"> ${starIconArr.join(' ')}</section>
        </section>
          <button id="expand-btn" class="button-primary" type="click" value="${item.id}">View Details</button>
      </section>
    </section>`;
  }else{
    return `
    <section class="raised-card">
      <section class="flex-item-list">
        <section class="flex-group-column">
          <section>${item.title}</section>
          <section class="bookmark-stars"> ${starIconArr.join(' ')}</section>
        </section>
          <button id="expand-btn" class="button-primary" type="click" value="${item.id}">Hide Details</button>
      </section>
      <section class="lowered-card">
        <p>${item.desc}</p>
        <section class="flex-item-buttons-inner">
        <button id="delete-btn" class="button-danger" type="click" value="${item.id}">Delete</button>
        <button class="button-primary"><a href="${item.url}"target="blank">Visit Link</a></button>
      </section>
      </section>
      </section>
    </section>

`; }
};

function generateBookmarksString(arr) {
  const items = arr.map((item) => generateBookmark(item));
  return items.join('');
};

function generateAddScreen() {
  $('main').html(`
  <section class="container">
  <h1>Bookmarks</h1>
  <section class="raised-card">
  <section class="lowered-card">
  <form>
  <fieldset>
  <legend class="hidden">Add a Bookmark</legend>
      <label for="bookmark-name">Title</label>
      <input id="bookmark-name" class="form-control" type="text" placeholder="Title" required />
      <label for="url">URL</label>
      <input id="url" class="form-control" type="url" placeholder="https://example.com" pattern="https://.*" required />
      <label for="desc">Description</label>
      <input type="textarea" id="desc" name="description" class="form-control" placeholder="Description" required>
      <section>Rating</section>
      <section class="star-rating-in-form">
      <input type="radio" id="star5" name="rating" value="5" /><label for="star5">5 stars</label>
      <input type="radio" id="star4" name="rating" value="4" /><label for="star4">4 stars</label>
      <input type="radio" id="star3" name="rating" value="3" /><label for="star3">3 stars</label>
      <input type="radio" id="star2" name="rating" value="2" /><label for="star2">2 stars</label>
      <input type="radio" id="star1" name="rating" value="1" /><label for="star1">1 star</label>
      </section>
        <section class="flex-item-buttons-inner">
        <button class="button-danger" type="click" id="cancel">Cancel</button>  
        <input class="button-primary" type="submit" id="add-bookmark" value="submit" required></input>
        </section>
        </fieldset>
    </form>
    </section>
    </section>
    </section>`);
};

function handleStarFilterButton(){
  $('#stars').on('change',  event => {
    let starArr = store.bookmarks.filter(item => {
      return item.rating >= event.currentTarget.value;
    });
    generateHomeScreen(starArr);
    $('#stars').val(event.currentTarget.value)
  });
}

export default {
  generateHomeScreen,
  generateAddScreen,
  generateBookmark,
};