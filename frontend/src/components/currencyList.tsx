import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardGroup, Typography, Slider } from '@douyinfe/semi-ui';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Descriptions } from '@douyinfe/semi-ui';
import { Button } from '@douyinfe/semi-ui';
import axios from 'axios';

function Demo() {
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState([]);

    const fetchCurrency = useCallback(async () => {
        try {
            setLoading(true);
            console.log(user._id)
            const response = await fetch(`http://localhost:8000/api/currency/${user._id}/`);
            if (response.ok) {
                const total = await response.json();
                setTotal(total);
            } else {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [user._id]);

    useEffect(() => {
        fetchCurrency();
    }, [fetchCurrency]);

    const handleBuy = async (amount) => {
        const url = `http://127.0.0.1:8000/api/currency/add/${user._id}/`;
      
        try {
            const response = await axios.patch(url, { amount: amount });
            console.log('API response:', response.data);
            
            // Refresh the balance after a successful purchase
            fetchCurrency();
        } catch (error) {
            console.error('Error making API request:', error);
        }
    };
    

    const data = [
        {
            key: 'Current Balance',
            value: (
                <span style={{ color: 'green' }}>
                    {total.length > 0 ? total[0].amount : 'Loading...'}
                </span>
            ),
        },
        {
            key: '',
            value: 'TOKEN',
        },
    ];
    const style = {
        boxShadow: 'var(--semi-shadow-elevated)',
        backgroundColor: 'var(--semi-color-bg-2)',
        borderRadius: '4px',
        padding: '10px',
        width: '350px',
        flex: '1 1 0',
    };

    const { Text } = Typography;

    const cardData = [
    { title: '10 TOK', content: '10 CAD | Beginner choice' },
    { title: '25 TOK', content: '20 CAD | Why not 50?' },
    { title: '50 TOK', content: '30 CAD | Most Popular' },
    { title: '80 TOK', content: '50 CAD | Even better' },
    { title: '120 TOK', content: '70 CAD | Why not 200?' },
    { title: '200 TOK', content: '100 CAD | Great Value' },
    ];

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
        boxSizing: 'border-box',
        padding: '20px',
    };

    return (
        <div style={containerStyle}>
          <div>
            <Descriptions data={data} row style={style} />
          </div>
          <br></br>
          <>
            <CardGroup spacing={40}>
              {cardData.map((v, idx) => (
                <Card
                  key={idx}
                  shadows='hover'
                  title={v.title}
                  headerLine={false}
                  style={{ width: 300 }}
                  headerExtraContent={
                    <Button
                        link
                        onClick={() => handleBuy(parseInt(v.title.split(' ')[0]))}
                        >
                      Buy
                    </Button>
                  }
                >
                  <Text>{v.content}</Text>
                </Card>
              ))}
            </CardGroup>
          </>
        </div>
      );
}

export default Demo;
