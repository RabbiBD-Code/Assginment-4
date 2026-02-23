let interviewList = [];
let rejectedList = [];
let currentStatus = '';

const total = document.getElementById('total');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');


const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')
const allJobCount = document.getElementById('all-job-count')


const allCardsection = document.getElementById('all-cards-section')
const noJobSectin = document.getElementById('no-job-section')
const filterSection = document.getElementById('filtered-section')
const mainContainer = document.querySelector('main')

const deleteBtn = document.querySelectorAll('.delete-btn')
// console.log(deleteBtn)


function calculateCount() {
    allJobCount.innerText = allCardsection.children.length
    total.innerText = allCardsection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    if (total.innerText == '0') {
        noJobSectin.classList.remove('hidden')
    }
}
calculateCount()


function toggleStyle(id) {
    allFilterBtn.classList.add('text-[#64748B]', 'text-xs', 'bg-white');
    interviewFilterBtn.classList.add('text-[#64748B]', 'text-xs', 'bg-white');
    rejectedFilterBtn.classList.add('text-[#64748B]', 'text-xs', 'bg-white');


    allFilterBtn.classList.remove('font-bold', 'bg-[#131aea]', 'text-white')
    interviewFilterBtn.classList.remove('font-bold', 'bg-[#131aea]', 'text-white')
    rejectedFilterBtn.classList.remove('font-bold', 'bg-[#131aea]', 'text-white')

    const selected = document.getElementById(id);
    currentStatus = id;
    // console.log(currentStatus)

    selected.classList.remove('text-[#64748B]', 'bg-white');
    selected.classList.add('bg-[#131aea]', 'font-bold', 'text-white')


    if (id == "interview-filter-btn") {
        allCardsection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        noJobSectin.classList.add('hidden')
        if (interviewList.length == 0) {
            noJobSectin.classList.remove('hidden')
        }
        renderInterview()
    }
    else if (id == "all-filter-btn") {
        allCardsection.classList.remove('hidden')
        filterSection.classList.add('hidden')
        noJobSectin.classList.add('hidden')
        if (total.innerText == '0') {
            noJobSectin.classList.remove('hidden')
        }
    }
    else if (id == "rejected-filter-btn") {
        allCardsection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        noJobSectin.classList.add('hidden')

        if (rejectedList.length == 0) {
            noJobSectin.classList.remove('hidden')
        }
        renderRejected()
    }
}



mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        const cardToRemove = event.target.parentNode.parentNode
        const jobTitle = cardToRemove.querySelector('.job-title').innerText
        cardToRemove.remove()

        if (currentStatus === 'interview-filter-btn') {
            interviewList = interviewList.filter(item => item.jobTitle !== jobTitle)
            if (interviewList.length == "0") {
                noJobSectin.classList.remove('hidden')
            }
        }

        if (currentStatus === 'rejected-filter-btn') {
            rejectedList = rejectedList.filter(item => item.jobTitle !== jobTitle)
            if (rejectedList.length == "0") {
                noJobSectin.classList.remove('hidden')
            }
        }
        calculateCount()
    }

    if (event.target.classList.contains('rejected-btn')) {

        // console.log(event.target.parentNode.parentNode)
        const parentNode = event.target.parentNode.parentNode;
        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const jobName = parentNode.querySelector('.job-name').innerText;
        const jobAddress = parentNode.querySelector('.job-address').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;

        parentNode.querySelector('.status').innerText = 'Rejected'

        const cardInfo = {
            jobTitle,
            jobName,
            jobAddress,
            status: "Rejected",
            jobDescription
        }
        // console.log(cardInfo)
        const existCard = rejectedList.find(item => item.jobTitle == cardInfo.jobTitle)
        if (!existCard) {
            rejectedList.push(cardInfo)
        }

        interviewList = interviewList.filter(item => item.jobTitle != cardInfo.jobTitle)

        if (currentStatus == 'interview-filter-btn') {
            renderInterview()
            if (interviewList.length == 0) {
                noJobSectin.classList.remove('hidden')
            }
        }

        calculateCount()
    }

    else if (event.target.classList.contains('interview-btn')) {
        // console.log(event.target.parentNode.parentNode)
        const parentNode = event.target.parentNode.parentNode;
        const jobTitle = parentNode.querySelector('.job-title').innerText;
        const jobName = parentNode.querySelector('.job-name').innerText;
        const jobAddress = parentNode.querySelector('.job-address').innerText;
        const status = parentNode.querySelector('.status').innerText;
        const jobDescription = parentNode.querySelector('.job-description').innerText;

        parentNode.querySelector('.status').innerText = 'Interview'

        const cardInfo = {
            jobTitle,
            jobName,
            jobAddress,
            status: "Interview",
            jobDescription
        }
        // console.log(cardInfo)
        const existCard = interviewList.find(item => item.jobTitle == cardInfo.jobTitle)
        if (!existCard) {
            interviewList.push(cardInfo)
        }
        rejectedList = rejectedList.filter(item => item.jobTitle != cardInfo.jobTitle)

        if (currentStatus == 'rejected-filter-btn') {
            renderRejected()
            if (rejectedList.length == 0) {
                noJobSectin.classList.remove('hidden')
            }
        }
        calculateCount()
    }
})

function renderRejected() {
    filterSection.innerHTML = ''

    for (let rejected of rejectedList) {
        // console.log(rejected)
        let div = document.createElement('div')
        div.classList = 'flex justify-between bg-white p-6 rounded-lg'
        div.innerHTML = `
        <div class="space-y-6 w-[80%]">
                    <div class="text-[#64748B]">
                        <h2 class="job-title font-semibold text-[18px] text-black">${rejected.jobTitle}</h2>
                        <p class="job-name">${rejected.jobName}</p>
                    </div>
                    <div class="text-[#64748B]">
                        <p class="job-address">${rejected.jobAddress}</p>
                    </div>
                    <div>
                        <button class="status bg-[#EEF4FF] px-3 py-2 text-sm font-medium rounded-sm">${rejected.status}</button>
                        <p class="job-description text-sm mt-2">${rejected.jobDescription}</p>
                    </div>
                    <div class="flex flex-col md:flex-row gap-2">
                        <button class="interview-btn border-2 border-[#10B981] font-semibold  px-3 py-2 text-sm rounded-sm">Interview</button>
                        <button class="rejected-btn border-2 border-[#EF4444] font-semibold px-3 py-2 text-sm rounded-sm">Rejected</button>
                    </div>
                </div>
                <div>
                    <img class="sm:w-full delete-btn border-2 border-gray-400/50 p-2 rounded-full flex justify-center" src="./Vector.png"
                        alt="">
                </div>
       
        `
        filterSection.appendChild(div)
    }
}


function renderInterview() {
    filterSection.innerHTML = ''

    for (let interview of interviewList) {
        // console.log(interview)
        let div = document.createElement('div')
        div.classList = 'flex justify-between bg-white p-6 rounded-lg'
        div.innerHTML = `
        <div class="space-y-6 w-[80%]">
                    <div class="text-[#64748B]">
                        <h2 class="job-title font-semibold text-[18px] text-black">${interview.jobTitle}</h2>
                        <p class="job-name">${interview.jobName}</p>
                    </div>
                    <div class="text-[#64748B]">
                        <p class="job-address">${interview.jobAddress}</p>
                    </div>
                    <div>
                        <button class="status bg-[#EEF4FF] px-3 py-2 text-sm font-medium rounded-sm">${interview.status}</button>
                        <p class="job-description text-sm mt-2">${interview.jobDescription}</p>
                    </div>
                    <div class="flex flex-col md:flex-row gap-2">
                        <button class="interview-btn border-2 border-[#10B981] font-semibold  px-3 py-2 text-sm rounded-sm">Interview</button>
                        <button class="rejected-btn border-2 border-[#EF4444] font-semibold px-3 py-2 text-sm rounded-sm">Rejected</button>
                    </div>
                </div>
                <div>
                    <img class="sm:w-full delete-btn border-2 border-gray-400/50 p-2 rounded-full flex justify-center" src="./Vector.png"
                        alt="">
                </div>
       
        `
        filterSection.appendChild(div)
    }
}