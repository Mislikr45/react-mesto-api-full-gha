import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../pages/index.css";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute"; //
import Header from "../components/Header";
import Main from "../components/Main";

import EditAvatarPopup from "../components/EditAvatarPopup";
import EditProfilePopup from "../components/EditProfilePopup";
import AddPlacePopup from "../components/AddPlacePopup";
import FormConfirmDeletCard from "../components/FormConfirmDeletCard";
import ImagePopup from "../components/ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  //{Хуки}
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddCardPopupOpen] = useState(false);
  const [isTrashPopupOpen, setTrashPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [checkRegister, setCheckRegister] = useState(false);
  const [parametrInfo, setParametrInfo] = useState(
    {image: "",
    subtitle: ""});
  const [isLoading, setIsloading] = useState(false);
  const [useLocation, setUseLocation]=useState({pathname:""})
  const [user, setUser] = useState({email: ""});

  // React.useEffect(() => {
  //   if (localStorage.getItem('jwt')) {
  //     const jwt = localStorage.getItem('jwt');

    //   auth
    //     .checkToken(jwt)
    //     .then((res) => {
    //       setLoggedIn(true)
    //       setUser(res.email)
    //       navigate("/", { replace: true })
    //     })
    //     .catch((err) => {
    //       if (err.status === 401) {
    //         console.log("401 — Токен не передан или передан не в том формате")
    //       }
    //       console.log("401 — Переданный токен некорректен")
    //     })
    // }
  // }, [navigate])
    useEffect(() => {
    handleTokenCheck()}, [navigate]);

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");      
      auth.checkToken(jwt).then((res) => {
        setUser({email:res.email});         
          setLoggedIn(true);          
          navigate("/main", { replace: true });        
      });
    }
  };

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardInfo()])
      .then(([userProfile, cards]) => {
        setCurrentUser(userProfile);
        setCards(cards);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, []);

  // Открытие попапов
  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddCardPopupOpen(true);
  }

  function checkRegisterAdd() {
    setCheckRegister(true);
  }

  function handleDeleteCard(card) {
    setTrashPopupOpen(card);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // Закрытие попапов
  function closeAllPopups() {
    setAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setTrashPopupOpen(false);
    setCheckRegister(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((error) => console.log(`Ошибка: ${error}`))
    } else {
      api
        .addLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((error) => console.log(`Ошибка: ${error}`))
    }
  }

  function handleCardDelete(card) {
    //   // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .deleteCard(card._id)
      .then((item) => {
        setCards((prevState) =>
          prevState.filter((item) => item._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(name, about) { 
    setIsloading(true)
    api
      .editeProfile(name, about)
      .then((profile) => {
        console.log(profile)
        setCurrentUser(profile);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=> {
        setIsloading(false)
      })
  }

  function handleUpdateAvatar(avatar) {
    setIsloading(true);
    api
      .editeAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })  
      .finally(()=> {
        setIsloading(false)
      })
  }

  const handleAddCard = (value) => {
    setIsloading(true)
    api
      .handleAddCardApi(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })  
      .finally(()=> {
        setIsloading(false)
      })
  };

  // useEffect(() => {
  //   handleTokenCheck()}, []);

  // const handleTokenCheck = () => {
  //   if (localStorage.getItem("jwt")) {
  //     const jwt = localStorage.getItem("jwt");      
  //     auth.checkToken(jwt).then((res) => {
  //       setUser({email:res.email});
  //       if (res) {
  //         setLoggedIn(true);          
  //         navigate("/main", { replace: true });
  //       }
  //     });
  //   }
  // };

  function handleRegister(email, password) {
    auth
      .register( email, password )
      .then((res) => {
        setParametrInfo({
          image: true,
          subtitle: "Вы успешно зарегистрировались!",
        });
        checkRegisterAdd();
        navigate("/sign-in", { replace: true });
      })
       .catch((err) => {        
        setParametrInfo({
          image: false,
          subtitle: "Что-то пошло не так! Попробуйте еще раз",
        });
        checkRegisterAdd();       
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUseLocation("/sign-in") 
    navigate("/sign-in");
  }

  function handleAuthorization({ email, password }) {
   auth
      .authorize({ email, password })
      .then((data) => {     
        localStorage.setItem("jwt", data.token);   
        setUser({email:email}); 
        setLoggedIn(true);             
        navigate("/main");        
      })
      .catch((err) => {
        console.log(err); 
        setParametrInfo({
          image: false,
          subtitle: "access denied!",
        });
        checkRegisterAdd();       
      });
  }

  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page__container">
          <Header handleSignOut={handleSignOut} 
          userEmail={user}
          setUseLocation={setUseLocation}
           />
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/main" />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />

            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />

            <Route
              path="/sign-in"
              element={
                <Login
                  onLogin={handleAuthorization}                                 
                />
              }
            />

            <Route
              path="/main"
              element={
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onDeleteCard={handleDeleteCard}
                  onCardClick={handleCardClick}
                  currentUser={currentUser}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCard={handleAddCard}
            isLoading={isLoading}
          />

          <FormConfirmDeletCard
            isOpen={isTrashPopupOpen}
            onClose={closeAllPopups}
          />

          <ImagePopup onClose={closeAllPopups} card={selectedCard} />

          <InfoTooltip
            isOpen={checkRegister}
            onClose={closeAllPopups}
            parametrInfo={parametrInfo}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
