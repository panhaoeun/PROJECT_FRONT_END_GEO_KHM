<template>
 
  <div class="m-4">
    <div class="row">
        <div class="col-4">
            <div class="card text-white bg-primary mb-4">
                <div class="card-body">
                    <h5 class="card-title">Primary card title</h5>
                    <p class="card-text">Some dummy text to make up the card's content. You can replace it anytime.</p>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card text-white bg-secondary mb-4">
                <div class="card-body">
                    <h5 class="card-title">Secondary card title</h5>
                    <p class="card-text">Some dummy text to make up the card's content. You can replace it anytime.</p>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card text-white bg-success mb-4">
                <div class="card-body">
                    <h5 class="card-title">Success card title</h5>
                    <p class="card-text">Some dummy text to make up the card's content. You can replace it anytime.</p>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card text-white bg-danger mb-4">
                <div class="card-body">
                    <h5 class="card-title">Danger card title</h5>
                    <p class="card-text">Some dummy text to make up the card's content. You can replace it anytime.</p>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card text-white bg-warning mb-4">
                <div class="card-body">
                    <h5 class="card-title">Warning card title</h5>
                    <p class="card-text">Some dummy text to make up the card's content. You can replace it anytime.</p>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card text-white bg-info mb-4">
                <div class="card-body">
                    <h5 class="card-title">Info card title</h5>
                    <p class="card-text">Some dummy text to make up the card's content. You can replace it anytime.</p>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card text-white bg-dark">
                <div class="card-body">
                    <h5 class="card-title">Dark card title</h5>
                    <p class="card-text">Some dummy text to make up the card's content. You can replace it anytime.</p>
                </div>
            </div>
        </div>
        <div class="col-4">
            <div class="card bg-light">
                <div class="card-body">
                    <h5 class="card-title">Light card title</h5>
                    <p class="card-text">Some dummy text to make up the card's content. You can replace it anytime.</p>
                </div>
            </div>
        </div>
    </div>
</div>
  <div class="card card-default">
    <div class="card-header">
      <h3 class="card-title">Select2 (Default Theme)</h3>

      <div class="card-tools">
        <button type="button" class="btn btn-tool" data-card-widget="collapse">
          <i class="fas fa-minus"></i>
        </button>
        <button type="button" class="btn btn-tool" data-card-widget="remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Minimal</label>
            <select class="form-control select2" style="width: 100%">
              <option selected="selected">Alabama</option>
              <option>Alaska</option>
              <option>California</option>
              <option>Delaware</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Washington</option>
            </select>
          </div>
          <!-- /.form-group -->
          <div class="form-group">
            <label>Disabled</label>
            <select
              class="form-control select2"
              disabled="disabled"
              style="width: 100%"
            >
              <option selected="selected">Alabama</option>
              <option>Alaska</option>
              <option>California</option>
              <option>Delaware</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Washington</option>
            </select>
          </div>
          <!-- /.form-group -->
        </div>
        <!-- /.col -->
        <div class="col-md-6">
          <div class="form-group">
            <label>Multiple</label>
            <select
              class="select2"
              multiple="multiple"
              data-placeholder="Select a State"
              style="width: 100%"
            >
              <option>Alabama</option>
              <option>Alaska</option>
              <option>California</option>
              <option>Delaware</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Washington</option>
            </select>
          </div>
          <!-- /.form-group -->
          <div class="form-group">
            <label>Disabled Result</label>
            <select class="form-control select2" style="width: 100%">
              <option selected="selected">Alabama</option>
              <option>Alaska</option>
              <option disabled="disabled">California (disabled)</option>
              <option>Delaware</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Washington</option>
            </select>
          </div>
          <!-- /.form-group -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->

      <h5>Custom Color Variants</h5>
      <div class="row">
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label>Minimal (.select2-danger)</label>
            <select
              class="form-control select2 select2-danger"
              data-dropdown-css-class="select2-danger"
              style="width: 100%"
            >
              <option selected="selected">Alabama</option>
              <option>Alaska</option>
              <option>California</option>
              <option>Delaware</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Washington</option>
            </select>
          </div>
          <!-- /.form-group -->
        </div>
        <!-- /.col -->
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label>Multiple (.select2-purple)</label>
            <div class="select2-purple">
              <select
                class="select2"
                multiple="multiple"
                data-placeholder="Select a State"
                data-dropdown-css-class="select2-purple"
                style="width: 100%"
              >
                <option>Alabama</option>
                <option>Alaska</option>
                <option>California</option>
                <option>Delaware</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Washington</option>
              </select>
            </div>
          </div>
          <!-- /.form-group -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.card-body -->
    <div class="card-footer">
      Visit
      <a href="https://select2.github.io/">Select2 documentation</a>
      for more examples and information about the plugin.
    </div>
  </div>
</template>

<script>
export default {};
</script>

