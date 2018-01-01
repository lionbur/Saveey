export default async url => (new DOMParser())
  .parseFromString(
    (await (
      await fetch(url, { mode: 'cors' })
    ).text())
      .replace(/\s+xmlns=".*?"/g, ''),
    'text/xml')