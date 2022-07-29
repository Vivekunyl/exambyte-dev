const videoContainer = document.getElementById("video-container-free");

const loadCourses = async () => {
  const res = await fetch("/getVimeoCourseData", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (data) {
    console.log(data);
    data.forEach();
  }
};

const loadVideo = async () => {
  const res = await fetch("/getfreevideos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  if (data) {
    for (let i = 0; i <= data.length; i++) {
      videoContainer.innerHTML += `
            <div class="video_section">
            <iframe src="${data[i].element.player_embed_url}&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=244555" width="300" height="280" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen="" title="Test video" style="margin: 1vmax"></iframe>
            </div>`;
    }
    loadCourses();
  }
};

const exploreCourse = (id) => {
  console.log(id);
  console.log("Loading");
};
