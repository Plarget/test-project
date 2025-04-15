import React, { useEffect, useMemo, useState } from 'react';
import { ListItem } from './components';
import useData from './useData';
import useSort from './useSort';
import { FixedSizeList as VirtualList } from 'react-window';

const SubTitle: React.FC<any> = ({children}) => (
  <h2 className={'list-subtitle'}>Active Item ID: {children}</h2>
)

function ListPage() {
  const items = useData();
  const [sortedItems, sortBy, handleSortClick] = useSort(items);

  const [activeItemId, setActiveItemId] = useState<any>(null);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [query, setQuery] = useState<string>('');

  const activeItemText = activeItemId !== null ? activeItemId : 'Empty'

  const handleItemClick = (id: any) => {
    setActiveItemId(id);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  useEffect(() => {
    const queryTrim = query.trim()

    if (queryTrim.length > 0) {
      setFilteredItems(sortedItems.filter(item => `${item.id}`.includes(queryTrim.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))));
    } else {
      setFilteredItems(sortedItems)
    }
  }, [query, sortedItems]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = filteredItems[index];

    return (
      <div style={style}>
        <ListItem
          key={item.id}
          isactive={activeItemId === item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          onClick={() => handleItemClick(item.id)}
        />
      </div>
    );
  };

  return (
    <div className={'list-wrapper'}>
      <div className="list-header">
        <h1 className={'list-title'}>Items List</h1>
        <SubTitle>{activeItemText}</SubTitle>
        <button onClick={handleSortClick}>Sort ({sortBy})</button>
        <input type="text" placeholder={'Filter by ID'} value={query} onChange={handleQueryChange}/>
      </div>
      <div className="list-container">
        <div className="list">
          {filteredItems.length === 0 && <span>Loading...</span>}
          <VirtualList
            height={760}
            width="100%"
            itemSize={110}
            itemCount={filteredItems.length}
          >
            {Row}
          </VirtualList>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
