import React, {useEffect, useState} from 'react';
import {createSkill, deleteSkill, getAllSkills} from "../http/skillAPI";
import {Button, Col, Container, Form, Table} from "react-bootstrap";
import {HexColorPicker} from "react-colorful";
import {observer} from "mobx-react-lite";

// import skillColorIcon from "../assets/icons/circle-fill.svg";
import {ReactComponent as SkillColorIcon} from '../assets/icons/circle-fill.svg';


const SkillPage = observer(() => {
    const [updateSkillList, setUpdateSkillList] = useState()
    const [skillList, setSkillList] = useState([])
    const [color, setColor] = useState('#000000')
    const [skillName, setSkillName] = useState('')


    useEffect(() => {
        getAllSkills().then(data => {
            // console.log(data
            setSkillList(data)
        }).catch(err => {
            console.log(err)
        })

    }, [updateSkillList])

    const handleCreateSkill = () => {
        createSkill(skillName, color).then(data => {
            // console.log(data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setUpdateSkillList(Date.now())
        })
    }
    const handleDeleteSkill = skill => {
        deleteSkill(skill).then(data => {
            console.log(data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setUpdateSkillList(Date.now())
        })
    }


    return (
        <Container>
            <Form>
                <Form.Group as={Col} className="mb-3" controlId="skillName">
                    <Form.Label column sm={2}>
                        Skill name
                    </Form.Label>
                    <Form.Control onChange={e => setSkillName(e.target.value)} type="text"
                                  placeholder="Enter skill name"/>
                </Form.Group>


                <Form.Group as={Col} className="mb-3" controlId="skillColor">
                    <Form.Label column sm={2}>
                        Skill color
                    </Form.Label>
                    <HexColorPicker color={color} onChange={setColor}/>
                    <br/>
                    <Button className='btn-green' onClick={handleCreateSkill}>
                        Create skill
                    </Button>
                </Form.Group>

            </Form>

            <Table>
                <tbody>
                {skillList.map((skill, i) =>
                    <tr key={i}>
                        {/*<td>id</td>*/}
                        <td>{skill.name}</td>
                        <td>{skill.color}</td>
                        <td><SkillColorIcon fill={skill.color} width="32" height="32"/></td>
                        <td>
                            <Button variant="outline-danger" onClick={() => handleDeleteSkill(skill)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    )
})

export default SkillPage;