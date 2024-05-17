import React from 'react'

const ListJapaneseWordsComponent = () => {
    const dummyData = [
        {
            "id": 1,
            "firstName": "Ernest",
            "age": 22
        },
        {
            "id": 2,
            "firstName": "Anastasia",
            "age": 20
        }
        ,
        {
            "id": 3,
            "firstName": "Igor",
            "age": 21
        }
    ]
  return (
    <div className='container'>
        <h2 className='text-center'>List of Names</h2>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {
                    dummyData.map(human => 
                        <tr key={human.id}>
                            <td>{human.id}</td>
                            <td>{human.firstName}</td>
                            <td>{human.age}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListJapaneseWordsComponent