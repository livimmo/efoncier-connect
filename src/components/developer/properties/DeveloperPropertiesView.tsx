import { useState } from 'react';
import { DeveloperPropertiesHeader } from './DeveloperPropertiesHeader';
import DeveloperPropertiesTable from './DeveloperPropertiesTable';
import { DeveloperPropertiesMap } from './DeveloperPropertiesMap';

const DeveloperPropertiesView = () => {
  const [view, setView] = useState<'list' | 'map'>('list');

  return (
    <div className="space-y-4 p-4">
      <DeveloperPropertiesHeader 
        currentView={view}
        onViewChange={setView}
      />
      
      {view === 'list' ? (
        <DeveloperPropertiesTable />
      ) : (
        <DeveloperPropertiesMap />
      )}
    </div>
  );
};

export default DeveloperPropertiesView;