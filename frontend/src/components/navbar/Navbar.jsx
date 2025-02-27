import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [pages, setPages] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stato per gestire l'apertura del menu 
  const [openSubMenus, setOpenSubMenus] = useState({}); // Stato per tenere traccia dei sottomenù aperti
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024); // Stato per verificare se la visualizzazione è su desktop
  const [selectedPage, setSelectedPage] = useState(null); // Stato per tracciare la pagina selezionata

  const navigate = useNavigate(); // Hook di React Router per la navigazione

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_BACKEND_HOST}/api/pages`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_FETCH_TOKEN}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPages(data);

        // Controlla l'URL attuale e imposta la pagina selezionata
        const currentPath = window.location.pathname; // Ottieni il percorso attuale
        const selectedIndex = data.findIndex((page) => `/${page.url}` === currentPath);
        setSelectedPage(selectedIndex); // Imposta la pagina selezionata
      }
    };

    fetchData();

    // Funzione per gestire il resize della finestra
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize); // Ascolta i cambiamenti della larghezza della finestra
    return () => window.removeEventListener("resize", handleResize); // Rimuove l'evento quando il componente viene smontato
  }, []);

  const handleLinkClick = (index, event, parentIndex = null) => {
    // Impedisce il comportamento predefinito del link (navigazione diretta)
    event.preventDefault(); 
  
    // Se parentIndex è definito, significa che è una sottovoce, quindi usiamo parentIndex,
    // altrimenti usiamo l'indice della voce principale (index)
    const targetIndex = parentIndex !== null ? parentIndex : index; 

    // Imposta la pagina selezionata nel menu, per evidenziarla come "attiva"
    setSelectedPage(targetIndex); 
  
    // Determina l'URL corretto da navigare
    // Se è una sottovoce, otteniamo l'URL dalla sottovoce specifica,
    // altrimenti otteniamo l'URL dalla voce principale
    const targetUrl = parentIndex !== null 
    ? pages[parentIndex].sub[index].url // URL della sottovoce
    : pages[index].url; // URL della voce principale

    // Naviga all'URL corretto senza ricaricare la pagina
    navigate(`/${targetUrl}`); 
  };
  
  // Funzione per toggle (apri/chiudi) il menu di navigazione
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Cambia lo stato di apertura del menu
  };

  // Funzione per renderizzare i sottomenù di una voce di menu
  const renderSubItemSection = (sub, parentIndex) => {
    return (
      <ul className="sub-list">
        {/* Mappa gli elementi del sottomenù (sub) e li rende come liste */}
        {sub.map((page, i) => (
          <li key={i}>
            <Link
              to={`/${page.url}`}
              // Gestisce il click sul sottolink, passando l'indice della sottovoce e la voce principale
              onClick={(event) => handleLinkClick(i, event, parentIndex)} 
            >
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };
  
  // Funzione per renderizzare una voce di menu (può avere un sottomenù)
  const renderItem = (page, index, isSubItem = false) => {

    const isSelected = selectedPage === index; // Verifica se l'elemento è selezionato confrontando con lo stato `selectedPage`

    return (
      <div
      className={`navbar-item ${page.sub && page.sub.length > 0 ? "has-sub" : ""} ${openSubMenus[index] ? "open" : ""} ${isSelected ? "selected" : ""}`}        
      key={index}
        onMouseEnter={() => {
          // Se è desktop e ci sono sottomenù, apri il sottomenù quando il mouse entra
          if (isDesktop && page.sub && page.sub.length > 0) {
            setOpenSubMenus((prevState) => ({
              ...prevState,  // Copia lo stato precedente
              [index]: true, // Apre il sottomenù corrispondente
            }));
          }
        }}
        onMouseLeave={() => {
          // Se è desktop, chiudi il sottomenù quando il mouse esce
          if (isDesktop) {
            setOpenSubMenus((prevState) => ({
              ...prevState,  // Copia lo stato precedente
              [index]: false, // Chiude il sottomenù corrispondente
            }));
          }
        }}
      >
        <div>
          <Link
            to={`/${page.url}`}
            onClick={(event) => {
              // Se non è un sottolink, gestisci il click sulla voce principale
              if (!isSubItem) handleLinkClick(index, event);
            }}
          >
            {page.name}
          </Link>
          {/* Se ci sono sottomenù, mostra il simbolo di espansione */}
          {page.sub && page.sub.length > 0 && (
            <span
              className="menu-toggle"
              onClick={(event) => {
                // Gestisci il toggle (apri/chiudi) del sottomenù
                setOpenSubMenus((prevState) => ({
                  ...prevState,
                  [index]: !prevState[index], // Toggle dell'apertura del sottomenù
                }));
              }}
            >
              {openSubMenus[index] ? " ▲" : " ▼"} {/* Mostra il simbolo di espansione o contrazione */}
            </span>
          )}
        </div>
        {/* Se ci sono sottomenù e sono aperti, renderizza i sottolink */}
        {page.sub && page.sub.length > 0 && openSubMenus[index] && (
          <div className="sub-menu">
            {renderSubItemSection(page.sub, index)} {/* Passa i sottolink al componente di rendering */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="navbar pt-3 pb-0 justify-content-center">
      <div className="col-12 col-lg-8">
        <button aria-label="Apri menu di navigazione" className="mobile-menu-toggle" onClick={handleMenuToggle}>&#9776; {/* Icona hamburger */}</button>
        <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          {pages.map((page, i) => renderItem(page, i))}
        </div>
      </div>
    </div>
  );
}
