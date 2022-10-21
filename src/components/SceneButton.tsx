import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { SceneGenerator } from '../scenes';

interface SceneButtonProps {
  scene: SceneGenerator;
}

function SceneButton({ scene }: SceneButtonProps) {
  const { applyScene } = useContext(AppContext);

  return (
    <div className='menu-button vertical' onClick={() => applyScene(scene)}>
      <div>{scene.name}</div>
      <button className='apply-button'>Otwórz</button>
    </div>
  );
}

export default SceneButton;
