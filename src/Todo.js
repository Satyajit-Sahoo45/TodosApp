import React, { useState } from 'react';
import img from "./images/todo.png";
import './App.css';

const Todo = () => {

    // get data from user input
    const [inputData, setInputData] = useState("");

    //stored data for showing
    const [items, setItems] = useState([]);
    
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setEditItem] = useState(null);



    //function add items to our stored useState 
    const addItem = () => {
        if (!inputData) {
            alert("please fill the data");
        } else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem){
                        return {...elem , name:inputData}
                    }
                    return elem;
                })
            );

            setToggleSubmit(true);
            setInputData('');
            setEditItem(null);
        }

         else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            // setItems([...items, inputData]);
            setInputData("");
        }
    }



    //function for editing current item
    const editItem = (clickedIndex) => {
        let newEditItem = items.find((elem) => {
            return elem.id === clickedIndex;
        })
        console.log(newEditItem);
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setEditItem(clickedIndex);
    }



    //function for delete item when click on trash button
    const deleteItem = (index) => {
        const updatedItems = items.filter((elem) => {
            return index != elem.id;
        });

        setItems(updatedItems)
    }

    //function for remove all items at a time
    const removeAll = () => {
        setItems([]);
    }

    return (
        <>
            <div className="main-div">
                <div className="child-div">

                    {/******************************** add todo image ***************************************************/}
                    <figure>
                        <h1 className="nameOf">Satyajit Sahoo</h1>
                        <img src={img} alt="todo img" />
                        <figcaption>Add Your List Here</figcaption>
                    </figure>

                    {/* 1st input field for take input items */}
                    <div className="addItems">
                        <input type="text " placeholder="✍ Add Items...." value={inputData}
                            onChange={(e) => {
                                setInputData(e.target.value);
                            }} />
                            {
                                toggleSubmit ? <i className="fa fa-plus-square add-btn" title="Add Items" onClick={addItem}></i> : 
                                               <i className="fas fa-edit add-btn" title="update Items.." onClick={addItem}></i>
                            }
                    </div>

                    {/********************************* To show the todo items **********************************************/}
                    <div className="showItems">
                        {items.map((elem) => {
                            return (
                                <div className="eachItem" key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="fas fa-edit add-btn" title="Edit Items.." onClick={() => editItem(elem.id)}></i>
                                        <i className="fas fa-trash-alt add-btn" title="Delete Items.." onClick={() => deleteItem(elem.id)}></i>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>

                    {/****************************** button for remove all items at a time **************************/}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>
                                Check List
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Todo;
