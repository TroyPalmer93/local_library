// Note: Please do not change the name of the functions. The tests use those names to validate your code.

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accA, accB) => {
    const lastA = accA.name.last.toLowerCase();
    const lastB = accB.name.last.toLowerCase();

    return lastA > lastB ? 1 : -1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    const count = book.borrows.reduce((borrowAcc, borrow) => {
      return borrow.id === account.id ? borrowAcc + 1 : borrowAcc;
    }, 0);

    return acc + count;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) { let books1=[];
  books1 =  books
  .filter((book) => {
    const recent = book.borrows[0];
    console.log(recent.returned, account.id, recent.id);
    return recent.returned==false && account.id === recent.id;
  });

  let result = books1.map((book)=>{
    const author = authors.find((author) => author.id === book.authorId);
      return { ...book, author };
  });
  console.log(result);
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
