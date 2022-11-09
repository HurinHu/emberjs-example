const mapIdToAttributes = new Map([
  [
    '1',
    {
      email: 'Owen.Harber@gmail.com',
      first_name: 'Owen',
      last_name: 'Harber',
      avatar:
        'https://reqres.in/img/faces/56c176c3-4b78-471d-85d1-b2f6535aaab2.jpg',
    },
  ],
  [
    '2',
    {
      email: 'Myah.Pfannerstill@gmail.com',
      first_name: 'Myah',
      last_name: 'Pfannerstill',
      avatar:
        'https://reqres.in/img/faces/a59e325b-5aac-4b74-99f1-b45735b0c6cd.jpg',
    },
  ],
]);

// Default export is for loading data into Mirage
export default Array.from(mapIdToAttributes.values());

// Named export is for unit testing the model
function getAttributesForId(id) {
  return mapIdToAttributes.get(id);
}

export { getAttributesForId };
