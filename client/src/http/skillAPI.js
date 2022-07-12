import {$authHost} from "./index";


export const createSkill = async (name, color) => {
    return await $authHost.post('api/skill/create', {name, color})
}
export const deleteSkill = async (skill) => {
    return await $authHost.delete('api/skill/delete', {data: skill})
}
export const getAllSkills = async () => {
    const {data} = await $authHost.get('api/skill/all')
    return data
}
// export const getSkillsByName = async (skillNames) => {
//     const {data} = await $authHost.get('api/skill/getbynames', skillNames)
//     return data
// }

