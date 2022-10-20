import './Menu.css';

function Menu() {
  return (
    <div className='menu'>
      <div className='menu-section'>
        <h3>Narzędzia</h3>
        <div className='buttons'>
          <button>Dodawanie</button>
          <button className='active'>Przesuwanie</button>
          <button>Usuwanie</button>
        </div>
      </div>
      <div className='menu-section'>
        <h3>Relacje</h3>
      </div>
      <div className='menu-section'>
        <h3>Sceny</h3>
      </div>
    </div>
  );
}

export default Menu;
