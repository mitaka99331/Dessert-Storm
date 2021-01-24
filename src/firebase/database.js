import React, { createContext, useState, useEffect, useContext } from "react";

import { database } from "./index";
import { useAuth } from "./auth";

const DatabaseContext = createContext();

const useDatabase = () => useContext(DatabaseContext);

const DatabaseProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const postsRef = database.ref("posts");
  const usersRef = database.ref("users");

  const addNewPost = (uid, text) => {
    return postsRef.child(uid).push({ text });
  };

  const updateUserInfo = () => {
    const { uid, displayName, email, phoneNumber, photoURL } = currentUser;
    usersRef.child(uid).update({ displayName, email, phoneNumber, photoURL });
  };

  const addFriend = (newFriend) => {
    return usersRef
      .child(currentUser.uid)
      .child("friends")
      .child(newFriend)
      .set({ date: Date.now() });
  };

  const getUserByUid = async (uid) => {
    const { displayName, photoURL } = (
      await usersRef.child(uid).once("value")
    ).val();

    return { uid, displayName, photoURL };
  };

  const getUserPosts = async (uid) => {
    const fetched = await postsRef.child(uid).once("value");

    return {
      posts: fetched.val(),
      uid,
    };
  };

  const getUserFriends = () => {
    return usersRef
      .child(currentUser.uid)
      .once("value")
      .then((snapshot) => {
        //Exit if user don't have friends
        if (!snapshot.val().friends) {
          return;
        }

        const getFriends = [];
        Object.keys(snapshot.val().friends).map((friend) => {
          getFriends.push(getUserByUid(friend));
        });

        return Promise.all(getFriends).then((values) => {
          const mappedData = values.reduce(
            (obj, { uid, displayName, photoURL }) => {
              obj[uid] = { displayName, photoURL };
              return obj;
            },
            {}
          );

          return mappedData;
        });
      });
  };

  const getFriendsPosts = () => {
    return usersRef
      .child(currentUser.uid)
      .once("value")
      .then(async (snapshot) => {
        const getPosts = [];

        if (!snapshot.val().friends) {
          return;
        }
        Object.keys(snapshot.val().friends).map((user) => {
          getPosts.push(getUserPosts(user));
        });

        return Promise.all(getPosts).then((values) => {
          const mappedData = values.reduce((obj, { uid, posts }) => {
            obj[uid] = posts;
            return obj;
          }, {});

          return mappedData;
        });
      });
  };

  const getLatestUsers = () => {
    const NUMBER_OF_USERS = 20;
    return usersRef.once("value").then((snapshot) => {
      const users = [];

      Object.keys(snapshot.val()).forEach((user) => {
        const { displayName, photoURL } = snapshot.val()[user];

        if (users.length === NUMBER_OF_USERS) {
          return users;
        }
        if (currentUser.uid !== user) {
          users.push({ user, displayName, photoURL });
        }
      });
      return users;
    });
  };

  useEffect(() => {
    updateUserInfo();
  }, []);

  const value = {
    addNewPost,
    getUserPosts,
    getUserByUid,
    getUserFriends,
    getLatestUsers,
    getFriendsPosts,
    addFriend,
    getUserFriends,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export { useDatabase, DatabaseProvider };

// const getUserByUid = (uid) => {
//   return usersRef
//     .child(uid)
//     .once("value")
//     .then((snapshot) => {
//       return snapshot.val();
//     });
// };

// const getUserPosts = async (uid) =>
//   (await postsRef.child(uid).once("value")).val();

// razlikata s predishnoto ti beshe...
// asinhronno vzimash userite...
// kato gi vzemesh asinhronno vzimash by uid
// i realno vsichko stava v nqkakuv budesht moment ot vremeto
// i nikoga ne poluchavash re-render
// sega asinhronno fetchvash dannite, no imash nqkakva sinhronizaciq na requesta

// toest ti imashe async v async :D
// a trqbva samo ednoto da e async

// ili ako iskash async v async, togava trqbva da imash nqkakuv method na sinhronizaciq
// v JS ne znam kakuv e
// v Golang - znam

//am dobre a taka napisano predpolagam she e bavno vseki friend shte trqbva da se getva

// mhm, az zatova ti kazah vsicko nakup na 1 put  // dam kak moje li da mi pokajesh ?
// mi ne znam kak, trqbva prez google, no sega trqbva da hodq da si pravq qdene, ako namerq neshto shte ti pratq dobre
// const getUserFriends = async () => {
//   return usersRef
//     .child(currentUser.uid)
//     .once("value")
//     .then(async (snapshot) => {
//       // vzimash userite koito shte fetchvasah
//       const friendsInfo = {};
//       // iterirash gi, no polzvash map vmesto forEach, zashtoto s map moje da vurnesh nov masiv
//       // mapa ti e async, toest kat svursi vsichki async operacii e.g. getUserByUid() shte prikluchi i shte vurne noviq masiv
//       // ot tam poluchavash promise i go vrushtash
//       return Object.keys(snapshot.val().friends).map(async (friend) => {
//         // getUserByUid(friend).then(({ displayName, photoURL }) => {
//         // console.log("test1", displayName, photoURL);
//         // friendsInfo=[...friendsInfo,{uid:friend,displayName,photoURL}]
//         // friendsInfo[friend] = { displayName, photoURL };

//         // friendsInfo.push({uid:friend,displayName,photoURL})
//         // });

//         /// sa shte razgledam podrobno no kade tochno e razlikata s predi pulneshe obekta asinhronno i go vrushtashe sinhronno, absolutno sushtoto neshto kato predniq put
//         //razbrah kakvo stava ma ne i fixa

//         const { displayName, photoURL } = await getUserByUid(friend);

//         friendsInfo[friend] = { displayName, photoURL };

//         // return snapshot.val().friends;
//         return friendsInfo;
//       });
//     });
// };
