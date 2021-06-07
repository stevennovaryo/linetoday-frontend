export const templateArticles = {
  sections: [{articles: []}],
  title: 'Bookmark',
  renderWithoutArticles: {
    message: 'Kamu belum ada bookmarks'
  }
}

export default function initializeLocalStorage() {
  if (!localStorage.getItem('bookmarkedArticles')) {
    localStorage.setItem('bookmarkedArticles', JSON.stringify(templateArticles))
  }
}