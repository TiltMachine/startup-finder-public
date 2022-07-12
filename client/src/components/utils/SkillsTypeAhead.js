import React, {useEffect, useState} from 'react';
import {getAllSkills} from "../../http/skillAPI";
import {Form} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {observer} from "mobx-react-lite";

const SkillsTypeAhead = observer((props) => {

    // Выборка скилов в дропнауне
    const [options] = useState([])
    // То что выбираем
    const [selectedSkills, setSelectedSkills] = useState([])

    useEffect(()=>{
        getAllSkills().then(data => {
            data.forEach(skill => {
                options.push(skill)
            })
            try {
                if(props.reqSkills)
                    setSelectedSkills(props.reqSkills)
            } catch (e) {
                console.log(e)
            }

        })
        // console.log(options)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        props.data(selectedSkills)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedSkills])

    useEffect(()=>{
        setSelectedSkills([])
    }, [props.clearInput])


    return (
        <div>
            <Form.Group style={{marginTop: '10px'}}>
                <Form.Label>Навыки</Form.Label>
                <Typeahead
                    selected={selectedSkills}
                    id="basic-typeahead-multiple"
                    labelKey="name"
                    multiple
                    onChange={(selected) => {
                        setSelectedSkills(selected);
                    }}
                    options={options}
                    placeholder="Выберите несколько технологий"

                />
            </Form.Group>
        </div>
    )

})

export default SkillsTypeAhead;