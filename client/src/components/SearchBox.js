import React, {useState} from 'react'
import { Input } from 'antd';
import { SearchOutlined} from '@ant-design/icons';

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')

    const { Search } = Input;

    const onSearch = (e) =>{
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }
    return (
        
        <Search
        name='q' 
        placeholder="search..." 
        enterButton
        prefix={<SearchOutlined />} 
        onChange={(e)=> setKeyword(e.target.value) }
        allowClear onSearch={onSearch}/>
        
    )
}

export default SearchBox
