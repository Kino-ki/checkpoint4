function NavManager(user) {
  let navlinks;
  if (user?.is_admin === 1) {
    navlinks = [
      {
        id: 1,
        path: "/produits",
        title: "produits",
      },
      {
        id: 2,
        path: "/produits/fabricants",
        title: "fabricants",
      },
      {
        id: 3,
        path: "/produits/listenoel",
        title: "N liste du pere noel N",
      },
      {
        id: 4,
        path: "/produits/commandes",
        title: "N mes commandes N",
      },
    ];
  }
  if (user?.is_admin === 0) {
    navlinks = [
      {
        id: 1,
        path: "/produits",
        title: "produits",
      },
      {
        id: 2,
        path: "/produits/fabricants",
        title: "fabricants",
      },
      {
        id: 3,
        path: "/produits/listenoel",
        title: "N liste du pere noel N",
      },
    ];
  }
  if (user === undefined) {
    navlinks = [
      {
        id: 5,
        path: "/profil/inscription",
        title: "inscription",
      },
      {
        id: 6,
        path: "/profil/connexion",
        title: "connexion",
      },
    ];
  }

  return navlinks;
}

const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );
export { NavManager, arrayRange };
