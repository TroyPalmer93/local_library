// Note: Please do not change the name of the functions. The tests use those names to validate your code.

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => {
    const [recent] = book.borrows;
    return !recent.returned;
  }).length;
}
function sortValues(val) {
  const keys = Object.keys(val);
  return keys.sort((A,B) => {
    if (val[A] > val[B]) {
      return -1;
    } else if (val[B] > val[A]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }

    return acc;
  }, {});

  const sorted = sortValues(count);

  return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, { id, borrows }) => {
    acc[id] = borrows.length;
    return acc;
  }, {});

  const sorted = sortValues(groupById);
  return sorted
    .map((id) => {
      const { title: name } = books.find(({ id: bookId }) => bookId === id);
      return { name, count: groupById[id] };
    })
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];   
    }
    return acc;
  },{});

  for(let id in count){
    const sum = count[id].reduce((a,b)=>a+b);
    count[id] = sum;
  }
  const sorted = sortValues(count);
  return sorted.map((authorId)=>{
    console.log(authors.find(({id})=>{ 
      return id === authorId;
    }));
    const {name:{first, last}} = authors.find(({id})=> id === Number(authorId));   
    const name = `${first} ${last}`;
    return {name, count:count[authorId]};
  }).slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
