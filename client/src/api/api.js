import * as firebase from 'firebase';

export const ITEM_COLLECTION_NAME = 'items';

export const getItem = (id) => {
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => {
      console.log('Mock retrieving item');
      let MOCK_DATA = {
        id: '2oS3BIojyckicgzOhXoS',
        title: 'Ostepop fra Ostepopfabrikken(TM)',
        comment: 'Knallgod ostepot, litt mye løksmak.',
        tags: 'fdsfds,fdgfdg,gdfgdf',
        image: 'https://brands-b.prod.onewp.net/app/uploads/sites/44/2019/08/cheez-chruncherz-600x600.png',
        ratings: {
          'perbjester@gmail.com2': 5,
          'nr@unit.no': 2,
        },
        averageRating: 0,
        averageRatingCount: 2,
      };
      resolve(MOCK_DATA);
    });
  } else {
    return firebase
      .firestore()
      .collection(ITEM_COLLECTION_NAME)
      .doc(id)
      .get()
      .then((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
  }
};

export const getAllItems = () => {
  console.log(process.env.REACT_APP_MOCK_API);
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => {
      console.log('Mock retrieving list');
      let MOCK_DATA = [
        {
          id: '1oS3BIojyckicgzOhXoS',
          title: 'Item 1',
          comment: 'fsdfsdfsdf',
          image: 'https://brands-b.prod.onewp.net/app/uploads/sites/44/2019/08/cheez-chruncherz-600x600.png',
          averageRating: 4,
          averageRatingCount: 12,
        },
        {
          id: 'fsdfsdfsdfsdfsdfs',
          title: 'Item 1.5',
          comment: 'fsdfsdfsdf',
          tags: ['Junkfood', 'Burger'],
          image: 'https://brands-b.prod.onewp.net/app/uploads/sites/44/2019/08/cheez-chruncherz-600x600.png',
        },
        {
          id: 'fsdfsdfsdfsdfsdf2s',
          title: 'Item 1.6',
          comment:
            'fsdfsdfdsfsdsdfjfdks sdfkj fsdkjf sdksdkfj sdkljf sdkljf sdklfj sdklj fsdklj fsdklfj sdk fjsdklfj sdklfj sdklj fsdkljfsdkl gsdklb sd kldsjg sdkg fsdf',
          tags: ['Junkfood', 'Burger'],
          image: 'https://brands-b.prod.onewp.net/app/uploads/sites/44/2019/08/cheez-chruncherz-600x600.png',
          ratings: {
            'perbjester@gmail.com': null,
          },
          averageRating: null,
          averageRatingCount: 0,
        },
        {
          id: '2oS3BIojyckicgzOhXoS',
          title: 'Item 2',
          comment: 'jadda',
          image: 'https://brands-b.prod.onewp.net/app/uploads/sites/44/2019/08/cheez-chruncherz-600x600.png',
          averageRating: null,
          averageRatingCount: 423,
        },
        {
          id: '3oS3BIojyckicgzOhXoS',
          title: 'Item 3',
          comment: 'joda',
          image: 'https://brands-b.prod.onewp.net/app/uploads/sites/44/2019/08/cheez-chruncherz-600x600.png',
          averageRating: 5,
          averageRatingCount: 1,
        },
      ];
      resolve(MOCK_DATA);
    });
  } else {
    return firebase
      .firestore()
      .collection(ITEM_COLLECTION_NAME)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
      });
  }
};

export const updateItem = (item) => {
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => {
      console.log('MOCING SAVE (UPDATE) FOR ITEM : ', item);
      resolve();
    });
  } else {
    return firebase.firestore().collection(ITEM_COLLECTION_NAME).doc(item.id).set(item);
  }
};

export const addItem = (item) => {
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => {
      console.log('MOCING SAVE (ADD) FOR ITEM : ', item);
      resolve();
    });
  } else {
    return firebase.firestore().collection(ITEM_COLLECTION_NAME).add(item);
  }
};

export const deleteItem = (id) => {
  if (process.env.REACT_APP_MOCK_API === 'true') {
    return new Promise((resolve) => {
      resolve();
    });
  } else {
    return firebase.firestore().collection(ITEM_COLLECTION_NAME).doc(id).delete();
  }
};
