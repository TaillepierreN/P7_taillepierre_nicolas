<template>
  <div class="wrap">
    <div class="post">
      <div class="post_info">
        <div class="post_info_user">
          <img src="@/assets/img/icon.svg" alt="" />
          <h4>Nom de posteur</h4>
        </div>
        <h3>Titre</h3>
        <p>Posté le: XX/XX</p>
      </div>
      <div class="post_content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          corporis pariatur ducimus deserunt quisquam maiores omnis, voluptas,
          distinctio cupiditate a hic mollitia dicta modi deleniti consectetur
          placeat excepturi voluptatem necessitatibus!
        </p>
      </div>
      <div class="post_likebar">
        <p>like</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostComponent",
};
</script>

