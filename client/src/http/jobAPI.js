import {$authHost, $host} from "./index";


// export const createCompany = async (company) => {
//     return await $authHost.post('api/company/create', company)
// }

export const createJob = async (job) => {
    return await $authHost.post('api/job/create-job', job)
}

export const deleteJob = async (job) => {
    const {data} = await $authHost.delete('api/job/deleteJob', {data: job})
    // console.log("DATA i:", data)
    return data
}
export const editAndSaveJob = async (jobId, jobData) => {
    console.log(jobId, jobData)
    return await $authHost.post('api/job/edit-job', {jobId, jobData})
}


// export const getJobs = async (jobs) => {
//     const {data} = await $host.get('api/job/getcompanyjobs', {params: {jobs: jobs}})
//
//     return data
// }
export const getAllJobs = async () => {
    const {data} = await $host.get('api/job/all')
    return data
}
export const getBookmarkedJobs = async () => {
    const {data} = await $authHost.get('api/job/bookmarked-jobs')
    return data
}
export const addJobToBookmark = async (job) => {
    const {data} = await $authHost.post('api/job/add-job-to-bookmark', {job})
    return data
}
export const deleteJobFromBookmark = async (job) => {
    const {data} = await $authHost.delete('api/job/delete-job-from-bookmark', {data: {job}})
    return data
}
export const getUserResponses = async () => {
    const {data} = await $authHost.get('api/job/user-responses')
    return data
}
export const getJobResponses = async (job) => {
    const {data} = await $authHost.get('api/job/job-responses',{params: {job: job}})
    return data
}
export const getFilteredJobs = async (jobFilter) => {
    const {data} = await $host.get('api/job/filter-job',{params: {jobFilter: jobFilter}})
    return data
}
export const addToResponses = async (job) => {
    const {data} = await $authHost.post('api/job/add-to-responses', {job})
    return data
}

export const deleteFromResponses = async (id, job) => {
    const {data} = await $authHost.delete('api/job/delete-from-responses', {data: {id, job}})
    return data
}

