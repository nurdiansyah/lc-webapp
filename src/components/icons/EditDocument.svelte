<script>
  export let viewBox = "0 0 24 24";

  /**
   *
   * @type {string} [htmlColor]
   */
  export let htmlColor = undefined;
  export let title = ''
  const { class: className } = $$props;
</script>

<svg {...$$restProps} {viewBox} color={htmlColor} role="img" class="dbx-icon -type-svg {className}">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1l1-4l9.5-9.5z" />
  <title>{title}</title>
</svg>
