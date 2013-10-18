<?php

class Test extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
		'test' => 'required'
	);
}
