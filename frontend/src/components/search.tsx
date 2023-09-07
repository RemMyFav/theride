import React, { useEffect, useState } from 'react';
import { AutoComplete, List, Avatar, ButtonGroup, Button } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import { useSelector } from 'react-redux';

const SearchResults = ({ handleAccept }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const presetValues = ['computer_science', 'math', 'physics', 'chemistry', 'biology', 'extracurricular', 'other'];
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!(window.location.pathname === '/')) return;
    const fetchQuestions = async () => {
      const response = await fetch(`http://localhost:8000/api/questions/${user._id}/`);
      const data = await response.json();
      setSearchResults(data);
    };
    fetchQuestions();
  }, []);

  const handleSearch = async () => {
    setSearchResults([]);
    if (searchValue.trim() === '') {
      const response = await fetch(`http://localhost:8000/api/questions/${user._id}/`);
      const data = await response.json();
      setSearchResults(data);
    } else {
      const response = await fetch(`http://localhost:8000/api/questions/${user._id}/${searchValue}`);
      const data = await response.json();
      setSearchResults(data);
    }

    const url = `/search/`; // construct the new URL
    const question = null;
    window.history.pushState({}, '', url); // update the browser history and change the URL
  };  
  

  const handleChange = (value) => {
    setSearchValue(value);
  };

  const handlePressEnter = () => {
    handleSearch();
  };

  const handleAcceptQuestion = id => {
    if (id) {
      window.location.href = `/questions/${user._id}/q_id/${id}`;
    }
  };
  

  const renderItem = question => (
    <List.Item
      key={question._id}
      header={<Avatar color="blue">{question._id}</Avatar>}
      main={
        <div>
          <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{question.title}</span>
          <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0', width: 500 }}>{question.body}</p>
        </div>
      }
      extra={
        <ButtonGroup theme="borderless">
          <Button>{`Bounty: ${question.bounty}`}</Button>
          <Button onClick={() => handleAcceptQuestion(question._id)}>Accept</Button>
        </ButtonGroup>
      }
    />
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AutoComplete
          data={presetValues}
          value={searchValue}
          showClear
          prefix={<IconSearch />}
          placeholder="Search..."
          onChange={handleChange}
          onPressEnter={handlePressEnter}
          style={{ width: 600, marginRight: 16 }}

        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {searchResults.length > 0 && (
      <List
        dataSource={searchResults}
        renderItem={renderItem}
      />
    )}
    </div>
  );
};

export default SearchResults;
